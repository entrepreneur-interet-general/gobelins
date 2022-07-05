import A11yDialog from 'a11y-dialog';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

export function setupDialogs() {

    // Handle Search dialog
    const search_dialog_el = document.querySelector('#search_dialog');
    if (search_dialog_el) {
        const search_dialog = new A11yDialog(search_dialog_el);
        search_dialog
        .on('show', () => (disableBodyScroll(search_dialog_el)))
        .on('hide', () => (enableBodyScroll(search_dialog_el)));
    }
    
    
    

    // Handle Nav dialog
    const nav_dialog_el = document.querySelector('#nav_dialog');
    if (nav_dialog_el) {
        const nav_dialog = new A11yDialog(nav_dialog_el);
        
        nav_dialog
        .on('show', () => (disableBodyScroll(nav_dialog_el)))
        .on('hide', () => (enableBodyScroll(nav_dialog_el)));    
    }
    
}
