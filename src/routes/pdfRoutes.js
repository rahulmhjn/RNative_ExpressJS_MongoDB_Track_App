var express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth);



router.get('/pdf', async (req,res) => {

    async function printPDF() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        await page.goto('https://www.website.com/', {waitUntil: 'networkidle0'});
    
        const pdf = await page.pdf({ format: 'A4',
        path: `./${req.user.email}.pdf`,
        printBackground: true
        });
        console.log(pdf);
        await browser.close();
        return pdf;
    }

    printPDF().then(pdf => {
        res.set({
            'Content-Type':'application/pdf',
            'Content-Length': pdf.length
        })
        res.send(pdf);
    })

})

module.exports=router;