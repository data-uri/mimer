import db from 'mime-db';

console.log(`module.exports=new Map([${Object.keys(db).reduce((mapTemplate, mime) => {
    const { extensions = null } = db[mime];
    if (extensions) {
        for (const ext of extensions) {
            mapTemplate.push(`["${ext}","${mime}"]`);
        }
    }
    return mapTemplate;
}, []).join(',')}]);`);
