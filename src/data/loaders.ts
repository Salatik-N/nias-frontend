import {flattenAttributes, getStrapiURL} from "@/lib/utils";


const baseUrl = getStrapiURL();

async function fetchData(url: string) {
    const authToken = null;
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };

    try {
        const response = await fetch(url, authToken ? headers : {});
        const data = await response.json();
        return flattenAttributes(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getGlobalPageData() {
    // noStore();
    const url = new URL("/api/global?populate[header][populate][routes]=true&populate[header][populate][socialLinks]=true", baseUrl);

    return fetchData(url.href);
}
export async function getGlobalPageMetadata() {
    const url = new URL("/api/global", baseUrl);

    return await fetchData(url.href);
}
export async function getContactPageData() {
    const url = new URL("/api/contact?populate[socialLink]=true", baseUrl);

    return await fetchData(url.href);
}
export async function getAboutPageData() {
    const url = new URL("/api/about?populate[skills][populate][skill]=true", baseUrl);

    return await fetchData(url.href);
}

export async function getProjectsData(){
    const url = new URL("/api/projects", baseUrl);

    return await fetchData(url.href);
}
export async function getServicesData(){
    const url = new URL("/api/services", baseUrl);

    return await fetchData(url.href);
}




