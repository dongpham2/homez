export interface ICard {
        name: string  
        description: string
        address: string
        regularPrice: number 
        discountPrice: number
        bathrooms: number
        bedrooms: number
        furnished: boolean
        parking: boolean
        type: string
        offer: boolean
        imageUrls:string,
        area: number,
        userRef: string,
}

export interface IForYouHome {
        name: string,
        address: string,
        regularPrice: number,
        imageUrls: string,
        save: boolean,
        area:number,
        date: string,
}

export interface IOutStanding{
        imageUrls: string,
        isOpen: boolean,
        name: string,
        regularPrice:string,
        area: number,
        address: string,
}
export interface ICardLocation{
        name: string,
        subTitle: string,
        imageUrls: string,
        isSmall:boolean
}