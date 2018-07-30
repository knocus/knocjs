export interface FacebookResponse {
    app_id: string;
    type: string;
    application: string;
    expires_at: number;
    is_valid: boolean;
    scopes: string[];
    user_id: string;
}
export interface FacebookNotValid {
    is_valid: boolean;
}
export declare type FacebookData = FacebookResponse | FacebookNotValid;
