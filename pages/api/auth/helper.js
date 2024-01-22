export function checkAuth(handler, access_level = 0) {
    return async function (req, res) {
        // console.log(req.session.get('user'));
        /*
        const user = req.session.get('user');
        if(user == null) {
            res.status(403).json({ success: false, error: "You don't have permission to access this resource" });
            return;
        }

        if(access_level && access_level > user.access_level ) { 
            res.status(403).json({ success: false, error: "You don't have enough subscription level to access this resource" });
            return;
        }

        // console.log('user access_level: ', req.session.get('user')['access_level'])

        await handler(req, res);
        return;
        */
        const user = req.session.get('user');
        if(user == null) {
            res.status(403).json({ success: false, error: "You don't have permission to access this resource" });
            return;
        }
        await handler(req, res);
        return
    };
}; 
