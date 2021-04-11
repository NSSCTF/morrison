<template>
    <div class="reveal">Wlecome to NSSCTF</div>
    <button @click="start" class="btn btn-primary btn-ghost btn-shine">Start</button>

</template>

<script lang="ts">
import Vue, { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        if (localStorage.getItem('isFirst') == 'no') {
            router.push({path: '/'});
        }
        onMounted(() => {
            let duration = 0.8;
            let delay = 0.3;
            let revealText = document.querySelector(".reveal") as Element;
            let letters: any = revealText.textContent?.split("");
            revealText.textContent = "";
            let middle = letters.filter((e: any) => e !== " ").length / 2;
            letters.forEach((letter: any, i: any) => {
                let span = document.createElement("span");
                span.textContent = letter;
                span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
                revealText.append(span);
            });
        });

        const start = () => {
            localStorage.setItem('isFirst', 'ped');
            router.push({
                path: '/index',
                query: {
                    time: new Date().getTime()
                }
            })
            location.reload();
        }

        return {
            start
        }
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

body {
    display: flex;
    height: 100%;
    background-image: linear-gradient(rgba(3, 3, 3, 0.8), rgba(0, 0, 0, 0.8)),
        url(https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg);
    background-size: cover;
    justify-content: center;
    align-items: center;
    text-align: center;
    // background: rgb(255, 255, 255);
}

.reveal {
    position: relative;
    display: flex;
    top: 15%;
    color: #6ee1f5;
    font-size: 5em;
    font-family: Raleway, sans-serif;
    letter-spacing: 28px;
    text-transform: uppercase;
    white-space: pre;

    span {
        opacity: 0;
        transform: scale(0);
        animation: fadeIn 2.4s forwards;
    }

    &::before,
    &::after {
        position: absolute;
        content: "";
        top: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        background: rgb(253, 253, 253);
        opacity: 0;
        transform: scale(0);
    }

    &::before {
        left: 50%;
        animation: slideLeft 1.5s cubic-bezier(0.7, -0.6, 0.3, 1.5) forwards;
    }

    &::after {
        right: 50%;
        animation: slideRight 1.5s cubic-bezier(0.7, -0.6, 0.3, 1.5) forwards;
    }
}

@keyframes fadeIn {
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideLeft {
    to {
        left: -6%;
        opacity: 1;
        transform: scale(0.9);
    }
}

@keyframes slideRight {
    to {
        right: -6%;
        opacity: 1;
        transform: scale(0.9);
    }
}

@font-face {
    font-family: Biko;
    src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/biko-black.woff");
}

@import url(https://fonts.googleapis.com/css?family=Lato);

// body {
//     display: flex;
//     height: 100vh;
//     justify-content: center;
//     align-items: center;
//     background: #1a1e23;
// }

.btn {
    --hue: 190;
    position: relative;
    top: 50%;
    padding: 1rem 3rem;
    font-size: 1rem;
    line-height: 1.5;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    background-color: hsl(var(--hue), 100%, 41%);
    border: 1px solid hsl(var(--hue), 100%, 41%);
    outline: transparent;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: 0.25s;

    &:hover {
        background: hsl(var(--hue), 100%, 31%);
    }

    &-primary {
        --hue: 187;
    }

    &-ghost {
        color: hsl(var(--hue), 100%, 41%);
        background-color: transparent;
        border-color: hsl(var(--hue), 100%, 41%);

        &:hover {
            color: white;
        }
    }

    &-shine {
        color: white;

        &::before {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                120deg,
                transparent,
                hsla(var(--hue), 100%, 41%, 0.5),
                transparent
            );
            transform: translateX(-100%);
            transition: 0.6s;
        }

        &:hover {
            background: transparent;
            box-shadow: 0 0 20px 10px hsla(var(--hue), 100%, 41%, 0.5);
        }

        &:hover::before {
            transform: translateX(100%);
        }
    }
}

p {
    margin: 0 9em;
    font-size: 2em;
    font-weight: 600;
}

.landIn {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.8;
    color: white;
    font-family: Lora, serif;
    white-space: pre;

    span {
        animation: landIn 0.8s ease-out both;
    }
}

@keyframes landIn {
    from {
        opacity: 0;
        transform: translateY(-20%);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>