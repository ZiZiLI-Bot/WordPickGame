export default function getKeyActive (data,language) {
    for (let i in data) {
        language[i].addEventListener('click', () => {
            for (let j in data) {
                language[j].classList.remove('active');
                if (i == j) language[j].classList.add('active');
            }
            
        })
    }
}
