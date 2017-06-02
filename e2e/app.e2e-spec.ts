import { CbcraftAngularPage } from './app.po';

describe('cbcraft-angular App', () => {
	let page: CbcraftAngularPage;

	beforeEach(() => {
		page = new CbcraftAngularPage();
	});

	it('should display welcome message', done => {
		page.navigateTo();
		page.getParagraphText()
			.then(msg => expect(msg).toEqual('Welcome to app!!'))
			.then(done, done.fail);
	});
});
