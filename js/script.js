// Função para copiar email para o clipboard
function copiarEmail(event) {
    event.preventDefault();
    const email = 'eloisagoulart426@gmail.com';
    
    navigator.clipboard.writeText(email).then(() => {
        // Cria notificação de sucesso
        const notificacao = document.createElement('div');
        notificacao.textContent = 'E-mail copiado!';
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #00A896;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,168,150,0.3);
            z-index: 9999;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notificacao);
        
        // tempo notificação
        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }).catch(err => {
        alert('E-mail: eloisagoulart426@gmail.com');
    });
}

// Controle do carousel 
let slideAtual = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

// Petalhes do projeto
function abrirDetalhes(projetoId) {
    const modal = document.getElementById('modal-detalhes');
    const detalhes = document.getElementById(`detalhes-projeto-${projetoId}`);
    document.querySelectorAll('.detalhes-conteudo').forEach(d => d.style.display = 'none');
    
    // Projeto selecionado
    modal.style.display = 'flex';
    detalhes.style.display = 'block';
    
    // Carousel
    slideAtual[projetoId] = 0;
    mostrarSlide(projetoId, 0);
    criarIndicadores(projetoId);
    
    document.body.style.overflow = 'hidden';
}

// Fechar o modal
function fecharDetalhes() {
    const modal = document.getElementById('modal-detalhes');
    modal.style.display = 'none';
    
    // Pausa vídeos
    document.querySelectorAll('video').forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    // Restaura scroll
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modal-detalhes');
    if (event.target === modal) {
        fecharDetalhes();
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharDetalhes();
    }
});

// Mudar slide
function mudarSlide(projetoId, direcao) {
    const carousel = document.getElementById(`carousel-${projetoId}`);
    const slides = carousel.querySelectorAll('img');
    
    slideAtual[projetoId] += direcao;
    
    // Loop
    if (slideAtual[projetoId] >= slides.length) {
        slideAtual[projetoId] = 0;
    }
    if (slideAtual[projetoId] < 0) {
        slideAtual[projetoId] = slides.length - 1;
    }
    
    mostrarSlide(projetoId, slideAtual[projetoId]);
}

// Slide específico
function mostrarSlide(projetoId, index) {
    const carousel = document.getElementById(`carousel-${projetoId}`);
    const slides = carousel.querySelectorAll('img');
    
    slides.forEach(slide => slide.classList.remove('ativo'));
    
    if (slides[index]) {
        slides[index].classList.add('ativo');
    }
    
    atualizarIndicadores(projetoId, index);
}

// Criar indicadores
function criarIndicadores(projetoId) {
    const carousel = document.getElementById(`carousel-${projetoId}`);
    const indicadoresContainer = document.getElementById(`indicadores-${projetoId}`);
    const slides = carousel.querySelectorAll('img');
    
    indicadoresContainer.innerHTML = '';
    
    slides.forEach((slide, index) => {
        const indicador = document.createElement('span');
        indicador.classList.add('indicador');
        indicador.onclick = () => {
            slideAtual[projetoId] = index;
            mostrarSlide(projetoId, index);
        };
        indicadoresContainer.appendChild(indicador);
    });
    
    atualizarIndicadores(projetoId, 0);
}

// Atualizar indicadores
function atualizarIndicadores(projetoId, index) {
    const indicadores = document.querySelectorAll(`#indicadores-${projetoId} .indicador`);
    indicadores.forEach((ind, i) => {
        if (i === index) {
            ind.classList.add('ativo');
        } else {
            ind.classList.remove('ativo');
        }
    });
}

// Navegação por teclado no carousel
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('modal-detalhes');
    if (modal.style.display === 'flex') {
        // Encontra qual projeto está aberto
        const projetoAberto = [...document.querySelectorAll('.detalhes-conteudo')]
            .findIndex(d => d.style.display === 'block') + 1;
        
        if (projetoAberto > 0) {
            if (event.key === 'ArrowLeft') {
                mudarSlide(projetoAberto, -1);
            } else if (event.key === 'ArrowRight') {
                mudarSlide(projetoAberto, 1);
            }
        }
    }
});
