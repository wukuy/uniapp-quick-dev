export default function getCurrentPage() {
    const pages = getCurrentPages()

    return (pages[pages.length - 1])
}
