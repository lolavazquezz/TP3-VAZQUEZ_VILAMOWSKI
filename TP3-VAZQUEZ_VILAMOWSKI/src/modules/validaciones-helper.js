class ValidacionesHelper {
        getIntegerOrDefault = (value, defaultValue) => {
        if (parseInt(value)==null) return defaultValue;
        return value;
    };
        getStringOrDefault = (value, defaultValue) => {
        if (String(value)==null) return defaultValue;
        return value;
    };
    }
    export default new ValidacionesHelper();