

export function setCookie(name, value, days, isSecure) {
    let expires = "";
    let secure = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if(isSecure)
        secure = "Secure"
    document.cookie = name + "=" + (value || "") + expires + "; " + secure + "; path=/";
}

export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
       const cookie = cookies[i].trim();
       if(cookie.startsWith(name + "="))
            return cookie.substring((name + "=").length);
    }
    return null;
}

export function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

