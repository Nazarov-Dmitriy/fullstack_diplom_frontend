interface IDataSupportRequest {
    createdAt: Date;
    hasNewMessages: boolean;
    id: string,
    isActive: boolean;
    theme: string;
    client?: {
        id: string,
        email: string,
        name: string,
        contactPhone: string
    }
}

export default IDataSupportRequest;




