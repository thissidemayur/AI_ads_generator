export interface IStorageService {
    /** upload a local buffer or file path and return the public url */
    upload(file: Buffer| string , folder:string): Promise<string>

    /**delete a file based on its URL or public ID */
    delete(url:string): Promise<void>

    generateThumbnail?(videoUrl:string):Promise<string>
}