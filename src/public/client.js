let store = {
    roverData: [],
    rover: {},
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit'])
}

// add our markup to the page
const root = document.getElementById('root')

// update store 
const updateStore = (store, newState) => {
    store = Object.assign(store, newState)    
    render(root, store)
}

// render 
const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create contents 
const App = (state) => {
    let { rovers } = state
    return `
        <header>${headerContent()}</header>
        <main>
            <div class="rivers_btns_container"> ${RoversButtons(rovers)} </div>
        </main>
        <section>
            <div class="rover_info_container"> ${RoverInfo(store.rover)} </div>
            ${RoversImages(store.roverData)} 
        </section>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information
const headerContent = () => {
    return `Welcome to Mars Dashboeard`
};

const RoversButtons = (rovers) => {
    let roversContent = ``
    rovers.map(rover => {
        roversContent += `
            <a href="javascript:void(0);" class="button" onclick="getRover('${rover.toLowerCase()}');">
            ${rover}
            </a>
        `
    })
    return roversContent
}

const RoverInfo = (rover) => {
    if (Object.keys(rover).length === 0) {
        return ``
    }
    const roverInfo = `
    <h3> Rover Informations </h3>
    <table>
        <tr>
            <th>Name</th>
            <td>${rover.name}</td>
        </tr>
        <tr>
            <th>Landing Date</th>
            <td>${rover.landing_date}</td>
        </tr>
        <tr>
            <th>Launch Date</th>
            <td>${rover.launch_date}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>${rover.status}</td>
        </tr>
    </table>
    `
    return roverInfo
}

const RoversImages = (photos) => {
    let gallery = ''
    if (photos.length != 0) {
        gallery += `<h3> Rover Images </h3> <div class="gallery">`
        const roverPhotos = photos.map( x => x.img_src)
        roverPhotos.map( x => {
            gallery += `<img src="${x}" alt="Forest">`
        })
        gallery += `</div>`
    }
    
    return gallery
}
// ------------------------------------------------------  API CALLS
const getRover = (roverName) => {
    fetch(`http://localhost:3000/rover/${roverName}`)
    .then(res => res.json().then(data =>
        updateStore(store, {roverData: data.data.photos, rover:data.data.photos[0].rover})
    ))
}
