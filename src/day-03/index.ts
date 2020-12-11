import { readInput } from '../helpers'

const inputFile = `${__dirname}/input.txt`;

const calculateWires = (): [number, number] => {
    const wireInstructions = readInput(inputFile).map((inst) => inst.split(','))
    const visitedNodes: number[][] = []
    const crossingNodes: number[] = []
    const crossingDistances: number[] = []

    const setVisited = (x: number, y: number, steps: number) => {
        if (!visitedNodes[x]) {
            visitedNodes[x] = []
        }

        visitedNodes[x][y] = steps
    }

    const isVisited = (x: number, y: number): boolean => {
        return visitedNodes[x] !== undefined && visitedNodes[x][y] !== undefined
    }

    const updateNodes = (x: number, y: number, steps: number, wireIndex: number): void => {
        if (wireIndex == 0) setVisited(x, y, steps)
        else if (isVisited(x, y)) {
            crossingNodes.push(Math.abs(x) + Math.abs(y))
            crossingDistances.push(visitedNodes[x][y] + steps)
        }
    }

    for (let i = 0; i < wireInstructions.length; i++) {
        let x = 0;
        let y = 0;
        let curSteps = 0;

        for (let wi = 0; wi < wireInstructions[i].length; wi++) {
            const instruction = wireInstructions[i][wi]
            const steps = parseInt(instruction.substring(1, instruction.length), 10);
            switch(instruction[0]) {
                case "R":
                    for (let s = 0; s < steps; s++) {
                        x++;
                        curSteps++;
                        updateNodes(x, y, curSteps, i)
                    }
                    break;
                case "L":
                    for (let s = 0; s < steps; s++) {
                        x--;
                        curSteps++;
                        updateNodes(x, y, curSteps, i)
                    }
                    break;
                case "U":
                    for (let s = 0; s < steps; s++) {
                        y++;
                        curSteps++
                        updateNodes(x, y, curSteps, i)
                    }
                    break;
                case "D":
                    for (let s = 0; s < steps; s++) {
                        y--;
                        curSteps++;
                        updateNodes(x, y, curSteps, i)
                    }
                    break;
            }
        }
    }

    return [Math.min(...crossingNodes), Math.min(...crossingDistances)]
}

export const day3_step_1 = (): number => {
    return calculateWires()[0]; // 4981 is correct
}

export const day3_step_2 = (): number => {
    return calculateWires()[1]; // 164012 is correct
}