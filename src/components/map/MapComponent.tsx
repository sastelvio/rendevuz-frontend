'use client'

import L from 'leaflet'
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import MarkerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

const MapComponent = () => {
    return (
        <div>
            <MapContainer
                style={{
                    height: '110vh',
                    width: '100vw'
                }}
                center={[0, 160]}
                zoom={2}
                scrollWheelZoom={false}
                dragging={false}
                doubleClickZoom={false}
                attributionControl={false}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div >
    )
}

export default MapComponent