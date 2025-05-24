export const uploadToCloudnary = async(pics)=>{

    if(pics){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset","plotApp");
        data.append("cloud_name","dzsh1sn9w")

        const res = await fetch("https://api.cloudinary.com/v1_1/dzsh1sn9w/image/upload",{
            method:"post",
            body:data
        })

        const fileData = await res.json();
        return fileData.url.toString();
    }
    else console.log("error from upload function")
}