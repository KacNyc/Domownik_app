// gallery.js

import React, { useState, useEffect } from 'react';
import trashBinIcon from '../../assets/trash-bin-2-svgrepo-com.svg'; // Import ikony kosza / Importing a bin icon
import magnifierIcon from '../../assets/lupa.png'; // Import ikony lupy / Import ikony lupy
import '../styles/components/_gallery.scss'; // Import stylów dla komponentu Gallery / Importing styles for the Gallery component

const Gallery = () => {
    // State for storing photos
    // Stan do przechowywania zdjęć
    const [photoList, setPhotoList] = useState([]);

    // Local states for title, image, and potentially other photo-related data
    // Lokalne stany dla tytułu, obrazu i ewentualnie innych danych związanych z zdjęciem
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); // Indeks wybranego zdjęcia w modalu

    // States to search and sort
    // Stany do wyszukiwania i sortowania
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    // Effect retrieving data from localStorage on first rendering
    // Efekt pobierający dane z localStorage przy pierwszym renderowaniu
    useEffect(() => {
        const storedPhotos = JSON.parse(localStorage.getItem('photoList'));
        if (storedPhotos) {
            setPhotoList(storedPhotos);
        }
    }, []);

    // Effect that writes data to localStorage every time there is a change in photoList
    // Efekt zapisujący dane do localStorage przy każdej zmianie w photoList
    useEffect(() => {
        localStorage.setItem('photoList', JSON.stringify(photoList));
    }, [photoList]);

    // Support for adding a new photo
    // Obsługa dodawania nowego zdjęcia
    const handleAddPhoto = (e) => {
        e.preventDefault();
        if (title && image) {
            const newPhoto = {
                title,
                image,
                date: new Date().toLocaleString()
            };
            setPhotoList([...photoList, newPhoto]);
            setTitle('');
            setImage('');
        } else {
            alert('Proszę wypełnić wszystkie pola.');
        }
    };

    // Support for changing the image title
    // Obsługa zmiany tytułu zdjęcia
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Support for image file selection
    // Obsługa wyboru pliku zdjęcia
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    // Support of image preview display
    // Obsługa wyświetlania podglądu zdjęcia
    const handlePreviewImage = (photo) => {
        setPreviewImage(photo.image);
        setSelectedPhotoIndex(photoList.findIndex(item => item === photo));
    };

    // Support for closing the image preview
    // Obsługa zamknięcia podglądu zdjęcia
    const handleClosePreview = () => {
        setPreviewImage(null);
        setSelectedPhotoIndex(null);
    };

    // Deletion support
    // Obsługa usuwania zdjęcia
    const deletePhoto = (index, e) => {
        e.stopPropagation(); // Zapobiegamy otwarciu podglądu zdjęcia
        const newPhotoList = [...photoList];
        newPhotoList.splice(index, 1);
        setPhotoList(newPhotoList);
    };

    // Support for pressing the Enter key in the search field
    // Obsługa naciśnięcia klawisza Enter w polu wyszukiwania
    const handleSearchInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value);
        }
    };

    // Function to sort images based on date
    // Funkcja do sortowania zdjęć na podstawie daty
    const sortedPhotos = [...photoList].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Image filtering based on search term
    // Filtracja zdjęć na podstawie wyszukiwanego terminu
    const filteredPhotos = sortedPhotos.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Move to the previous photo in the modal
    // Przechodzenie do poprzedniego zdjęcia w modalu
    const handlePrevPhoto = (e) => {
        e.stopPropagation(); // Zapobiegamy zamknięciu modalu przy kliknięciu na przycisk / Prevent the modal from closing when the button is clicked
        if (selectedPhotoIndex > 0) {
            const newIndex = selectedPhotoIndex - 1;
            setPreviewImage(photoList[newIndex].image);
            setSelectedPhotoIndex(newIndex);
        }
    };

    // Move to the next photo in the modal
    // Przechodzenie do następnego zdjęcia w modalu
    const handleNextPhoto = (e) => {
        e.stopPropagation(); // Zapobiegamy zamknięciu modalu przy kliknięciu na przycisk / Prevent the modal from closing when the button is clicked
        if (selectedPhotoIndex < photoList.length - 1) {
            const newIndex = selectedPhotoIndex + 1;
            setPreviewImage(photoList[newIndex].image);
            setSelectedPhotoIndex(newIndex);
        }
    };

    return (
        <div className="gallery">
            {/* Formularz dodawania zdjęcia / Photo upload form */}
            <form onSubmit={handleAddPhoto} className="add-photo-form">
                <h2>Dodaj nowe zdjęcie</h2>
                <div>
                    <label htmlFor="title">Tytuł:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Zdjęcie:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Dodaj zdjęcie</button>
            </form>

            {/* Sekcja wyszukiwania i sortowania / Sort and filter section */}
            <div className="search-sort-wrapper">
                <div className="sort-options">
                    <label htmlFor="sort-order">Sortuj:</label>
                    {/* Dropdown do wyboru opcji sortowania / Dropdown to select sorting options */}
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value); // Ustawienie nowej wartości sortowania / Setting a new sorting value
                        }}
                    >
                        <option value="desc">Od najnowszych</option>
                        <option value="asc">Od najstarszych</option>
                    </select>
                </div>

                {/* Sekcja wyszukiwania / Search section*/}
                <div className="search-wrapper">
                    <img
                        src={magnifierIcon}
                        alt="lupa"
                        className="search-icon"
                        onClick={() => {
                            const searchInput = document.getElementById('search-input');
                            searchInput.classList.toggle('active'); // Toggle klasy 'active' dla inputa wyszukiwania / Toggle class 'active' for the search input
                            if (searchInput.classList.contains('active')) {
                                searchInput.focus(); // Ustawienie fokusu na polu wyszukiwania / Setting the focus on the search field
                            }
                        }}
                    />
                    <input
                        type="text"
                        id="search-input"
                        className="search-input"
                        placeholder="Wyszukaj..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // Obsługa klawisza Enter do wyszukiwania / Enter key support for searching
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearchInputKeyPress(e);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Wyświetlanie istniejących zdjęć / Displaying existing images*/}
            <div className="photo-list">
                {filteredPhotos.map((photo, index) => (
                    <div className="photo" key={index} onClick={() => handlePreviewImage(photo)}>
                        <img src={photo.image} alt={photo.title} />
                        <h3>{photo.title}</h3>
                        <p>Dodano: {photo.date}</p>
                        <div
                            className="delete-icon"
                            style={{ backgroundImage: `url(${trashBinIcon})` }}
                            onClick={(e) => deletePhoto(index, e)}
                        ></div>
                    </div>
                ))}
            </div>

            {/* Modal do wyświetlania zdjęcia w pełnym rozmiarze / Modal to display photo in full size*/}
            {previewImage && (
                <div className="modal" onClick={handleClosePreview}>
                    <div className="modal-content">
                        <span className="close" onClick={handleClosePreview}>&times;</span>
                        <img src={previewImage} alt="Pełny rozmiar zdjęcia" />
                        {/* Przyciski nawigacyjne w modalu / Modal navigation buttons */}
                        <div className="buttons">
                            <button className="nav-button prev" onClick={handlePrevPhoto}>Poprzednie</button>
                            <button className="nav-button next" onClick={handleNextPhoto}>Następne</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
