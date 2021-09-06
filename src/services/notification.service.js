import { notification } from 'antd';

const success = (title, text, duration) => {
    this._showNotification('success', title, text, duration);
}

const warning = (title, text, duration) => {
    this._showNotification('warning', title, text, duration);
}

const error = (title, text, duration) => {
    this._showNotification('error', title, text, duration);
}

const showNotification = (type, title, text, duration = 4.5) => {
    notification[type]({
        message: title,
        description: text,
        placement: 'bottomRight',
        duration: duration
    });
}

export default {
	success,
	warning,
	error,
	showNotification
}