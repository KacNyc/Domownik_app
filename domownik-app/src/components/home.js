// home.js

import React, { useState, useEffect } from 'react';
import lupa from '../../assets/lupa.png';
import trashBinIcon from '../../assets/trash-bin-2-svgrepo-com.svg';
import '../styles/components/_home.scss';

const Home = () => {
    const [entries, setEntries] = useState([]); // Stan przechowujący wpisy
    const [sortOrder, setSortOrder] = useState('desc'); // Stan przechowujący porządek sortowania ('asc' lub 'desc')
    const [searchTerm, setSearchTerm] = useState(''); // Stan przechowujący aktualny termin wyszukiwania
    const [newEntryContent, setNewEntryContent] = useState(''); // Stan przechowujący nową treść wpisu
    const [newEntryTags, setNewEntryTags] = useState(''); // Stan przechowujący nowe tagi wpisu

    // Efekt pobierający wpisy z localStorage przy pierwszym renderowaniu komponentu
    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        setEntries(storedEntries);
    }, []);

    // Efekt zapisujący aktualne wpisy do localStorage po każdej zmianie w stanie 'entries'
    useEffect(() => {
        localStorage.setItem('entries', JSON.stringify(entries));
    }, [entries]);

    // Funkcja dodająca nowy wpis do listy
    const addEntry = () => {
        if (newEntryContent.trim() !== '') {
            const newEntry = {
                date: new Date().toLocaleString('pl-PL'),
                content: newEntryContent,
                tags: newEntryTags.split(' ').filter(tag => tag.startsWith('#'))
            };
            setEntries([newEntry, ...entries]);
            setNewEntryContent('');
            setNewEntryTags('');
        }
    };

    // Funkcja usuwająca wpis na podstawie jego indeksu
    const deleteEntry = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
    };

    // Obsługa zmiany wartości wyszukiwania
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Obsługa naciśnięcia klawisza Enter w polu wyszukiwania
    const handleSearchInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value);
        }
    };

    // Sortowanie i filtrowanie wpisów na podstawie sortOrder i searchTerm
    const getFilteredAndSortedEntries = () => {
        const filteredEntries = entries.filter(entry =>
            entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const sortedEntries = filteredEntries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return sortedEntries;
    };

    const filteredAndSortedEntries = getFilteredAndSortedEntries();

    // Renderowanie komponentu
    return (
        <div className="entry-list">
            <h1 className="slogan">Zapisz zanim zapomnisz ;)</h1>

            {/* Sekcja wyszukiwania i sortowania */}
            <div className="search-sort-wrapper">
                <div className="sort-options">
                    <label htmlFor="sort-order">Sortuj:</label>
                    {/* Dropdown do wyboru opcji sortowania */}
                    <select id="sort-order" value={sortOrder} onChange={(e) => {
                        setSortOrder(e.target.value); // Ustawienie nowej wartości sortowania
                    }}>
                        <option value="desc">Od najnowszych</option>
                        <option value="asc">Od najstarszych</option>
                    </select>
                </div>

                {/* Sekcja wyszukiwania */}
                <div className="search-wrapper">
                    <img
                        src={lupa}
                        alt="lupa"
                        className="search-icon"
                        onClick={() => {
                            const searchInput = document.getElementById('search-input');
                            searchInput.classList.toggle('active'); // Toggle klasy 'active' dla inputa wyszukiwania
                            if (searchInput.classList.contains('active')) {
                                searchInput.focus(); // Ustawienie fokusu na polu wyszukiwania
                            }
                        }}
                    />
                    <input
                        type="text"
                        id="search-input"
                        className="search-input"
                        placeholder="Wyszukaj..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearchInputKeyPress}
                    />
                </div>
            </div>

            {/* Sekcja dodawania nowych wpisów */}
            <div className="inputList">
                <div className="new-entry">
                    <div className="inputs">
                        <input
                            type="text"
                            id="new-entry-input"
                            placeholder="Nowy wpis..."
                            value={newEntryContent}
                            onChange={e => setNewEntryContent(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && addEntry()}
                        />
                        <input
                            type="text"
                            id="new-entry-tags"
                            placeholder="Dodaj hasztagi..."
                            value={newEntryTags}
                            onChange={e => setNewEntryTags(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && addEntry()}
                        />
                    </div>
                    <button id="add-entry" onClick={addEntry}>
                        Klik!<br />Klik!
                    </button>
                </div>

                {/* Sekcja wyświetlania wpisów */}
                <div className="entries">
                    {filteredAndSortedEntries.map((entry, index) => (
                        <div className="entry" key={index}>
                            <div className="date">{entry.date}</div>
                            <div className="content">{entry.content}</div>
                            <div className="tags">
                                {entry.tags.map((tag, i) => (
                                    <span key={i}>{tag}</span>
                                ))}
                            </div>
                            <div
                                className="delete-icon"
                                style={{ backgroundImage: `url(${trashBinIcon})` }}
                                onClick={() => deleteEntry(index)}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
