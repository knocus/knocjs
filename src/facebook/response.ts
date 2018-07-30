export interface FacebookData {
    app_id: string,
    type: string,
    application: string,
    expires_at: number,
    is_valid: boolean,
    scopes: string[],
    user_id: string,
}