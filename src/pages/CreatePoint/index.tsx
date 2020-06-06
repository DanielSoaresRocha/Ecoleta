import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import Dropzone from '../../components/Dropzone'

import './styles.css';

import logo from '../../assets/logo.svg'

interface Item {
    id: number
    title: string
    img_url: string
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}
const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<String[]>([])
    const [cities, setCities] = useState<String[]>([])
    const [selectedUf, setSelectedUf] = useState<String>()
    const [selectedCity, setSelectedCity] = useState<String>('')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [selectedFile, setSelectedFile] = useState<File>()

    const [selectedItems, setSelectedItems] = useState<Number[]>([])
    const [name, setName] = useState<String>('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setSelectedPosition([
                latitude,
                longitude
            ])
        })
    }, [])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla)
                setUfs(ufInitials)
            })
    }, [])

    useEffect(() => {
        if (selectedUf === String(0)) {
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome)
                setCities(cityNames)
            })
    }, [selectedUf])

    function handleSelectedUf (event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUf(event.target.value)
    }

    function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value)
    }

    function handleMapClick (event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    async function handleSubmit (event: FormEvent) {
        event.preventDefault()

        const dataForm = new FormData()
        const data = {
            name,
            email,
            whatsapp,
            uf: selectedUf,
            city: selectedCity,
            latitude: selectedPosition[0],
            longitude: selectedPosition[1],
            items: selectedItems
        }
        dataForm.append('data', String(data.name))
        dataForm.append('email', String(data.email))
        dataForm.append('whatsapp', String(data.whatsapp))
        dataForm.append('uf', String(data.uf))
        dataForm.append('city', String(data.city))
        dataForm.append('latitude', String(data.latitude))
        dataForm.append('longitude', String(data.longitude))
        dataForm.append('items', String(data.items))

        if (selectedFile)
            dataForm.append('image', selectedFile)

        await api.post('/points', dataForm)

        history.push('/')
    }
    function handleSelectedItem (id: Number) {
        if (!selectedItems.includes(Number(id))) {
            setSelectedItems([...selectedItems, id])
        } else {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        }
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <fieldset>
                    <Dropzone onFileUploaded={setSelectedFile} />

                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label
                            htmlFor="name">Nome da entidade</label>
                        <input
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                value={email}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                value={whatsapp}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setWhatsapp(event.target.value)}
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço no mapa</span>
                    </legend>

                    <Map center={selectedPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estados (UF)</label>
                            <select onChange={handleSelectedUf} className="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={String(uf)} value={String(uf)} >{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select value={String(selectedCity)} onChange={handleSelectedCity} className="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={String(city)} value={String(city)}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Items de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectedItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.img_url} alt="item" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>

        </div>
    );
}

export default CreatePoint;
