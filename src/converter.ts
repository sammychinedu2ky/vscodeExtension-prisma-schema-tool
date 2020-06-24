import { TextEncoder, TextDecoder } from "util"

let { writeFileSync, readFileSync } = require('fs')
//location of the schema file you want to adjust
//let schema = readFileSync('./schema.prisma')

//converts snake-case columns to camel-case
function toCamelCase(word: string) {
    let newWord = word.split('_')
    newWord[1] = newWord[1][0].toUpperCase() + newWord[1].slice(1)
    return newWord.join("")
}

//the main function
function main(input: Uint8Array) {
    let schema:string = new TextDecoder().decode(input)
    schema = schema + '\n'
    let regex = new RegExp(/\w*_\w*/g)
    let lines = <RegExpMatchArray>schema.match(/.*\n/g)
    lines.forEach((line: any, i) => {
        if (/model/.test(line) && regex.test(line)) {
            let modelName: string
            if (!line) {
                modelName = line.match(line.match(regex))[0]
                lines[i] = line.replace(modelName, toCamelCase(modelName)) + `\t  @@map("${modelName}")\n`

            }
        }
        else {
            if (regex.test(line)) {
                let snakeCase = <RegExpMatchArray>line.match(regex)
                let newLine = ''
                snakeCase.forEach((item, i) => {
                    if (i == 0) {
                        newLine = line.replace(item, toCamelCase(item))
                    }
                    else {
                        newLine = newLine.replace(item, toCamelCase(item))
                    }
                })
                if (line.trim().match(/^\w*_\w*/)) {
                    newLine = newLine.replace(/\n/, ` @map("${snakeCase[0]}")\n`)
                }

                lines[i] = newLine

            }
        }
    })

    let output = lines.join('')
    //write back to prisma file
   
    return new TextEncoder().encode(output)
}

export default main