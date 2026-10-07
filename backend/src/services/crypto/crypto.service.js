import crypto from 'node:crypto'
class CryptoService{
        generateHmac(string) {
        const hashed = crypto
            .createHmac("sha256", process.env.HMAC_KEY)
            .update(string)
            .digest("hex");
        return hashed;
    }
    encrypt(string){
        const iv = crypto.randomBytes(12)
        const cipher = crypto.createCipheriv('aes-256-gcm',Buffer.from(process.env.ENCRYPTION_KEY,'base64'),iv)
        const encrypted = Buffer.concat([
            cipher.update(string,'utf-8'),
            cipher.final()
        ])
        const authTag = cipher.getAuthTag()
        return [
            iv.toString("base64"),
            encrypted.toString("base64"),
            authTag.toString("base64")
        ].join(":")
    }
    decrypt(string){
        const [ivString,encryptedString,authTag] = string.split(":");
        const iv = Buffer.from(ivString,"base64")
        const encrypted = Buffer.from(encryptedString,"base64")
        const auth = Buffer.from(authTag,"base64")
        
        const decipher = crypto.createDecipheriv('aes-256-gcm',Buffer.from(process.env.ENCRYPTION_KEY,'base64'),iv)
        decipher.setAuthTag(auth);
        const decrypted = Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ])
        return decrypted.toString("utf-8")

    }
}

export const cryptoService = new CryptoService()
