#### Struktura projektu:

* /domownik-app
*     /assets
*         domownik-app/assets/lupa.png
*         task-manager-done-manager-task-svgrepo-com.svg
*         trash-bin-2-svgrepo-com.svg
*     /node_modules
*     /src
*       /components
*         navbar.js
*         home.js
*         gallery.js
*         chat.js
*         users.js
*      /styles
*         /components
*             _navbar.scss
*             _home.scss
*             _gallery.scss
*             _chat.scss
*             _extra.scss
*         main.scss
*         _global.scss
*     .babel.rc
*      index.html
*      app.js
*      webpack.config.js
*     package.json
*     webpack.config.js

# **Opis projektu: Aplikacja do zarządzania wpisami**

Projekt aplikacji do zarządzania wpisami jest stworzony w środowisku React, umożliwiającym użytkownikom dodawanie, przeglądanie, sortowanie i wyszukiwanie wpisów. Aplikacja jest skonstruowana w modularny sposób, z wykorzystaniem komponentów React oraz stylów SCSS.

## **Komponent Home**

Komponent Home jest centralną częścią aplikacji, odpowiadającą za wyświetlanie listy wpisów, ich sortowanie oraz zarządzanie nimi.

#### Stan komponentu:
* entries: Tablica przechowująca wpisy użytkownika.
* sortOrder: Określa aktualny porządek sortowania wpisów (rosnąco lub malejąco).
* searchTerm: Przechowuje aktualnie wprowadzony przez użytkownika termin wyszukiwania.
* newEntryContent i newEntryTags: Zawartość i tagi nowego wpisu dodawanego przez użytkownika.

#### Efekty uboczne:
* useEffect zapisuje oraz odczytuje wpisy z localStorage, zapewniając zachowanie danych po odświeżeniu strony.

#### Funkcje:
* addEntry: Dodaje nowy wpis na podstawie danych wprowadzonych przez użytkownika.
* deleteEntry: Usuwa wybrany wpis na podstawie jego indeksu.

#### Elementy interfejsu użytkownika:
* Slogan (h1 className="slogan"): Wyświetla motywujący slogan na górze strony.
* Sort options (div className="sort-options"): Pozwala użytkownikowi sortować wpisy według daty.
* New entry form (div className="new-entry"): Formularz do dodawania nowych wpisów.
* Lista wpisów (div className="entries"): Wyświetla posortowane i przefiltrowane wpisy.
* Ikona usuwania (div className="delete-icon"): Ikona do usuwania wybranych wpisów.

#### Stylizacja:
* Stylizacja komponentu Home jest zarządzana za pomocą arkusza stylów SCSS. Obejmuje ona m.in. ustawienia marginesów, paddingów, kolorów oraz interakcji użytkownika.