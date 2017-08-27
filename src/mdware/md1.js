module.exports = async function(ntx, next) {
    try {
        await next();
        if (ntx.response.status != 200) {
            ntx.body = JSON.stringify({ code: ntx.response.status, message: ntx.response.message });
        }
    } catch (e) {
        ntx.body = JSON.stringify({ code: 100000, message: e.message });
    }
}