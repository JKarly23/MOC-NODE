import { promises as fs } from 'fs';
import { ResultAsync } from 'typescript-functional-extensions';


const countWords = (data: string): ResultAsync<number | string> => {
    return data.length > 0
        ? ResultAsync.success((data.match(/sit/gi) || []).length)
        : ResultAsync.failure('No words to count');
}

const readingData = (): ResultAsync<number | string> => {
    return ResultAsync.try(
        () => fs.readFile('data/data.md', {
            encoding: 'utf-8',
            flag: 'r'
        }),
        () => 'Error reading file'
    ).ensure(
        (data: string) => data.length > 0,
        () => 'File is empty or does not exist'
    ).bind(countWords);
}



console.log('Reading data...');
readingData().match({
    success: (count) => console.log(`Counted words: ${count}`),
    failure: (error) => console.error(`Error: ${error}`)
})