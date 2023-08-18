<script>
    import './style.css';
    import logo from '$lib/main-img/logo.png'
</script>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profi Second Hand</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap"
            rel="stylesheet"
        />
    </head>
    <body>
        <div class="content">
            <header>
                <img src={logo} alt="logo" />

                <input id="toggle" type="checkbox" />

                <label for="toggle" class="hamburger">
                    <div class="top-bun"></div>
                    <div class="meat"></div>
                    <div class="bottom-bun"></div>
                </label>
                <div class="nav">
                    <div class="nav-wrapper">
                        <nav>
                            <a href="#">KDE NÁS NAJDETE</a><br />
                            <a href="#">VŠECHNY AKCE A SLEVY</a><br />
                            <a href="#">VŠECHNY AKTUALITY</a><br />
                            <a href="#">KONTAKTY</a><br />
                            <a href="#">NAPIŠTE NÁM</a>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                <div class="title">
                    <h1>PROFI SECOND HAND</h1>
                    <div class="desc">
                        <h4>Ekologicky smýšlející second hand</h4>
                    </div>
                </div>
                <div class="news-header">
                    <h1>Nejnovější nabídky</h1>
                </div>
                <div class="news">
                    <div class="item">
                        <h3>SLEVA AŽ: 50%</h3>
                        <p>Pardubice</p>
                        <button>Zjistit více</button>
                    </div>
                    <div class="item">
                        <h3>SLEVA AŽ: 40%</h3>
                        <p>Praha 8, Ládví</p>
                        <button>Zjistit více</button>
                    </div>
                    <div class="item">
                        <h3>SLEVA AŽ: 40%</h3>
                        <p>Písek</p>
                        <button>Zjistit více</button>
                    </div>
                    <div class="item">
                        <h3>SLEVA AŽ: 35%</h3>
                        <p>Ústí nad Labem</p>
                        <button>Zjistit více</button>
                    </div>
                </div>
                <section class="content">
                    <div class="locations">
                        <h1>Kde nás najdete</h1>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1489224.4202027265!2d14.835149716045992!3d49.78081745515962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPROFI%20SECOND%20HAND%20-%20Jakub%20P%C3%BDcha!5e0!3m2!1sen!2scz!4v1685722648970!5m2!1sen!2scz"
                            width="350"
                            height="250"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <a href=""><button>Seznam všech lokací</button></a>
                    </div>
                    <div class="newsletter">
                        <h1>Novinky do mobilu</h1>
                        <p>
                            Chcete být informováni o akcích ve Vašem okolí pomocí
                            SMS? Zaregistrujte se!
                        </p>
                        <select name="" id="">
                            <option selected disabled>vyberte město</option>
                            <option value="">Praha</option>
                            <input
                                type="text"
                                placeholder="tel. číslo (777 666 555)"
                            />
                        </select>
                        <button>Uložit</button>
                    </div>
                    <div class="socials">
                        <h1>Sociální sítě</h1>
                        <p>
                            Všechny novinky na jednom místě, aktuální fotky, akce,
                            slevy. Buďte s námi na facebooku a instagramu!
                        </p>
                        <div class="links">
                            <div class="facebook">
                                <svg
                                    width="75px"
                                    height="75px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                                        fill="#0F0F0F"
                                    />
                                </svg>
                            </div>
                            <div class="instagram">
                                <svg
                                    width="75px"
                                    height="75px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                        fill="#0F0F0F"
                                    />
                                    <path
                                        d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                        fill="#0F0F0F"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                                        fill="#0F0F0F"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </body>
</html>
