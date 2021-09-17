export default function PlayAudio() {
    const audio = $('.audio');
    const state = {
        active: false,
    }
    $('#audio')[0].pause();
    audio[0].innerHTML = `<i class="fad fa-volume-slash"></i>`
    audio[0].addEventListener('click', () => {
        state.active = !state.active;
        if (state.active) {
            audio[0].innerHTML = `<i class="fad fa-volume-up"></i>`
        } else {
            audio[0].innerHTML = `<i class="fad fa-volume-slash"></i>`
        }
        if (state.active) {
            $('#audio')[0].play();
        } else {
            $('#audio')[0].pause();
        }
    })
}
