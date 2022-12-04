 export interface Promotion {
        highlighted: boolean;
        urgent: boolean;
        top_ad: boolean;
        options: string[];
        b2c_ad_page: boolean;
        premium_ad_page: boolean;
    }

    export interface Value {
        value: number;
        type: string;
        arranged: boolean;
        budget: boolean;
        currency: string;
        negotiable: boolean;
        converted_value?: any;
        previous_value?: any;
        converted_previous_value?: any;
        converted_currency?: any;
        label: string;
        key: string;
    }

    export interface Param {
        key: string;
        name: string;
        type: string;
        value: Value;
    }

    export interface User {
        id: number;
        created: Date;
        other_ads_enabled: boolean;
        name: string;
        logo?: any;
        logo_ad_page?: any;
        social_network_account_type?: any;
        photo?: any;
        banner_mobile: string;
        banner_desktop: string;
        company_name: string;
        about: string;
        b2c_business_page: boolean;
        is_online: boolean;
        last_seen: Date;
        seller_type?: any;
    }

    export interface Contact {
        name: string;
        phone: boolean;
        chat: boolean;
        negotiation: boolean;
        courier: boolean;
    }

    export interface Map {
        zoom: number;
        lat: number;
        lon: number;
        radius: number;
        show_detailed: boolean;
    }

    export interface City {
        id: number;
        name: string;
        normalized_name: string;
    }

    export interface Region {
        id: number;
        name: string;
        normalized_name: string;
    }

    export interface Location {
        city: City;
        region: Region;
    }

    export interface Photo {
        id: number;
        filename: string;
        rotation: number;
        width: number;
        height: number;
        link: string;
    }

    export interface Category {
        id: number;
        type: string;
    }

    export interface Rock {
        offer_id?: any;
        active: boolean;
        mode?: any;
    }

    export interface Delivery {
        rock: Rock;
    }

    export interface Safedeal {
        weight: number;
        weight_grams: number;
        status: string;
        safedeal_blocked: boolean;
        allowed_quantity: any[];
    }

    export interface Shop {
        subdomain?: any;
    }

    export interface CEVA {
        id: number;
        url: string;
        title: string;
        last_refresh_time: Date;
        created_time: Date;
        valid_to_time: Date;
        pushup_time: Date;
        description: string;
        promotion: Promotion;
        params: Param[];
        key_params: string[];
        business: boolean;
        user: User;
        status: string;
        contact: Contact;
        map: Map;
        location: Location;
        photos: Photo[];
        partner?: any;
        category: Category;
        delivery: Delivery;
        safedeal: Safedeal;
        shop: Shop;
        offer_type: string;
    }

