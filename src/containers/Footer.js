function Footer() {
    const currentDate = new Date();
    return (
        <footer className="p-3 bg-gray text-dark text-center">
            <div id="copyright">
                <p>{currentDate.getFullYear()} © Расписание автобусов</p>
            </div>
        </footer>
    );
}

export default Footer;
