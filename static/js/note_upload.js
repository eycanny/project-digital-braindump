'use strict';

const myCloudName = cloudinary.setCloudName("digitalbraindump");
const myPreset = "khfzmnxx"

function showUploadWidget() {
    cloudinary.openUploadWidget({
        cloudName: myCloudName,
        uploadPreset: myPreset,
        sources: [
            "local",
            "url"
        ],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
            palette: {
                window: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0078FF",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#0078FF",
                action: "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1"
            },
            fonts: {
                default: null,
                "'Poppins', sans-serif": {
                    url: "https://fonts.googleapis.com/css?family=Poppins",
                    active: true
                }
            }
        }
    },
        (err, info) => {
            if (!err) {
                console.log("Upload Widget event - ", info);
            }
        });
}