class Vacation{
    constructor(
        public destination: string,
        public description: string,
        public image: string,
        public startDate: string,
        public endDate: string,
        public price: number,
        public vacationID?: number,
        public followers?: number,

    ){}
}

export default Vacation;