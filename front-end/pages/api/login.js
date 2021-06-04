import { withIronSession } from 'next-iron-session';
import { sessionConfig } from '../../middlewares/session';


async function loginAPI(req, res) {
    if(req.method == 'POST') { // Login user (data)
        try {
            const user = await fetch(process.env.STRAPI_PUBLIC_API_URL + '/auth/local', {
                method: 'POST', headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(req.body)
            })
            .then(res => res.json())
            .then((data) => ({ ...data.user, strapiToken: data.jwt }));

            if(!user.confirmed)return res.status(401).json({statusCode: 401, message: 'La tentative de connexion a échoué.'});

            req.session.set('user', user);
            await req.session.save();
            res.status(200).json(user);
        
        } catch(error) {
            const { response: fetchResponse } = error;
            if(fetchResponse) {
                return res.status(fetchResponse?.status || 500).json(error.response?.data);
            }
            res.status(500).json(error);
        }
    }
}

export default withIronSession(loginAPI, sessionConfig);