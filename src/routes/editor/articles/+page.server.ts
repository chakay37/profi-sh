export function load({ setHeaders, cookies }) {
    const authenticated = cookies.get('editorLogin');
    if (authenticated === 'Bbftr89/hbf19') {
        return { authenticated: true };
    }
    return { authenticated: false };
}