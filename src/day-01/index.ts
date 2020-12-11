import { readInputAsNumbers } from '../helpers'

const inputFile = `${__dirname}/input.txt`;
const modules = readInputAsNumbers(inputFile)

const calculateFuel = (mass: number): number => {
    return Math.floor(mass / 3) - 2
}

const calculateFuel2 = (mass: number, fuel: number = 0): number => {
    const tempFuel = Math.floor(mass / 3) - 2
    if (tempFuel <= 0) {
        return fuel;
    }

    return calculateFuel2(tempFuel, fuel + tempFuel)
}

export const day1_step_1 = (): number => {
    return modules.map(calculateFuel).reduce((a, b) => a + b) // 3348430 is correct
}

export const day1_step_2 = () => {
    return modules.map((mass) => calculateFuel2(mass)).reduce((a, b) => a + b) // 5019767 is correct
}
