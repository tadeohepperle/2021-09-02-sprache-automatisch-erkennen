import { FingerprintObject, generateLanguages } from "./docs/Fingerprint.mjs";

const LANGUAGES = generateLanguages();

console.log(LANGUAGES[0].fingerprint);
