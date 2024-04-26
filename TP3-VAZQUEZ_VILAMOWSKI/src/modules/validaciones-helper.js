class ValidacionesHelper {
        getIntegerOrDefault = (value, defaultValue) => {

        if (typeof value !== 'number') return defaultValue;
        return value;
    }
    getStringOrDefault = (value, defaultValue) => {
        if (typeof value !== 'string') return defaultValue;
        return value;
    }
}
    export default new ValidacionesHelper();
