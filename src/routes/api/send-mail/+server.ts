import { SENDGRID_API_KEY } from '$env/static/private';
import sgMail from '@sendgrid/mail';
import { json } from '@sveltejs/kit';

sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST({ request }) {
	const { contactMail, contactName, contactPhone, informationAboutProject } = await request.json();

	if (!contactMail || !contactName || !contactPhone || !informationAboutProject) {
		json({ message: 'Could not send email. Missing data.' }, { status: 400 });
	}

	const message = {
		to: 'fredrik@digidevs.no',
		from: 'fredrik@digidevs.no',
		subject: 'Contact Form on your web page: Split Web',
		html: `Somebody used the contact form on your site. <br/>
    Name: ${contactName}<br/>
    Email: ${contactMail}<br/>
    Phone: ${contactPhone}<br/>
    Information about the project: ${informationAboutProject}`
	};
	try {
		await sgMail.send(message);
		return json({ emailSentSuccsessfully: true });
	} catch (err) {
		return json({ err }, { status: 500 });
	}
}
