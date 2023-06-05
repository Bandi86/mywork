export default function formatData(obj) {
    return Object.keys(obj).map((item) => ({
        ...obj[item], item
    }));
}
