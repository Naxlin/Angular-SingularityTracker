export class Singularity {
    constructor (
        public id: string,
        public name: string,
        public imageUrl: string,
        public material?: string,
        public amount?: Number,
        public compoundOf?: Singularity[]
    ) 
    { }
}