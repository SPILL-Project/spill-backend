exports.getRandomDate = (start:any, end: any) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}