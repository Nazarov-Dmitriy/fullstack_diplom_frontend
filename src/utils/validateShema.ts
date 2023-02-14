const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
];

export function validateType(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.map((file) => {
            if (!SUPPORTED_FORMATS.includes(file.type)) {
                valid = false;
            }
        });
    }
    return valid;
}

export function validateSize(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.reduce(function (sum: number, current: File) {
            if (sum + current.size >= 10240000) {
                valid = false;
            }
            return sum + current.size;
        }, 0);
    }

    return valid;
}