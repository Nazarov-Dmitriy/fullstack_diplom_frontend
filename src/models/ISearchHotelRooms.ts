interface ISearchHotelRooms {
    id: string;
    offset: number | string;
    limit: number | string;
    isEnabled?: boolean,
    startDate?: Date | string,
    endDate?: Date | string,
}

export default ISearchHotelRooms;
