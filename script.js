// 章节数据
const chaptersData = [
  {
    number: 1,
    title: "提高人群护理水平，促进健康",
    description: "人口健康策略和社区干预措施",
    url: "chapter1.html"
  },
  {
    number: 2,
    title: "糖尿病的诊断和分类",
    description: "诊断标准、分类和筛查建议",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 3,
    title: "预防或延缓糖尿病及相关并发症",
    description: "生活方式干预和药物预防策略",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 4,
    title: "全面的医学评估和并发症评估",
    description: "初始和随访评估指南",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 5,
    title: "促进积极健康行为和福祉",
    description: "行为改变策略和心理健康",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 6,
    title: "血糖目标",
    description: "血糖监测和治疗目标",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 7,
    title: "糖尿病技术",
    description: "设备选择和使用指南",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 8,
    title: "肥胖和体重管理",
    description: "评估和治疗方法",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 9,
    title: "药物治疗方法",
    description: "药物选择和治疗策略",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 10,
    title: "心血管疾病和风险管理",
    description: "预防和治疗策略",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 11,
    title: "慢性肾脏疾病和风险管理",
    description: "筛查、预防和治疗",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 12,
    title: "视网膜病变、神经病变和足部护理",
    description: "并发症的筛查和管理",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 13,
    title: "老年人糖尿病",
    description: "特殊人群的治疗考虑",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 14,
    title: "儿童和青少年糖尿病",
    description: "年龄相关的考虑因素",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 15,
    title: "妊娠期糖尿病管理",
    description: "孕前、孕期和产后护理",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 16,
    title: "糖尿病护理中的社会心理因素",
    description: "心理健康评估和支持",
    url: "https://professional.diabetes.org/standards-of-care"
  },
  {
    number: 17,
    title: "住院患者的糖尿病护理",
    description: "医院内的血糖管理",
    url: "https://professional.diabetes.org/standards-of-care"
  }
];

// 当文档加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
  console.log('ADA糖尿病指南页面已加载');

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // 更新URL，不刷新页面
        history.pushState(null, null, targetId);
      }
    });
  });

  // 添加返回顶部按钮
  const backToTopButton = document.createElement('div');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.style.position = 'fixed';
  backToTopButton.style.bottom = '2rem';
  backToTopButton.style.right = '2rem';
  backToTopButton.style.width = '3rem';
  backToTopButton.style.height = '3rem';
  backToTopButton.style.backgroundColor = 'var(--primary-color)';
  backToTopButton.style.color = 'white';
  backToTopButton.style.borderRadius = '50%';
  backToTopButton.style.display = 'flex';
  backToTopButton.style.alignItems = 'center';
  backToTopButton.style.justifyContent = 'center';
  backToTopButton.style.cursor = 'pointer';
  backToTopButton.style.boxShadow = 'var(--shadow-md)';
  backToTopButton.style.opacity = '0';
  backToTopButton.style.visibility = 'hidden';
  backToTopButton.style.transition = 'var(--transition)';
  backToTopButton.style.zIndex = '1000';

  document.body.appendChild(backToTopButton);

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 监听滚动事件，控制返回顶部按钮的显示和隐藏
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });

  // 加载更多章节
  const loadMoreBtn = document.querySelector('.btn-primary[href*="overview"]');
  const chapterList = document.querySelector('.chapter-list');

  if (loadMoreBtn && chapterList) {
    // 点击加载更多按钮时
    loadMoreBtn.addEventListener('click', function(e) {
      // 如果不是所有章节都已显示，则加载更多
      if (chapterList.children.length < chaptersData.length) {
        e.preventDefault();

        // 显示加载中状态
        const originalText = loadMoreBtn.innerHTML;
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';

        // 模拟加载延迟
        setTimeout(() => {
          // 渲染所有章节
          renderChapters(chaptersData, chapterList);

          // 更新按钮文本
          loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> 已加载全部章节';

          // 禁用按钮
          loadMoreBtn.style.backgroundColor = '#4CAF50';
          loadMoreBtn.style.cursor = 'default';

          // 阻止默认点击行为
          loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
          });
        }, 1000);
      }
    });
  }

  // 添加章节悬停效果
  addChapterHoverEffect();
});

// 渲染章节列表
function renderChapters(chapters, container) {
  // 清空容器
  container.innerHTML = '';

  // 添加章节
  chapters.forEach(chapter => {
    const li = document.createElement('li');
    li.className = 'chapter-item';

    li.innerHTML = `
      <a href="${chapter.url}" class="chapter-link" target="_blank">
        <div class="chapter-number">${chapter.number}</div>
        <div class="chapter-content">
          <h3 class="chapter-title">${chapter.title}</h3>
          <p class="chapter-description">${chapter.description}</p>
        </div>
      </a>
    `;

    container.appendChild(li);
  });

  // 添加章节悬停效果
  addChapterHoverEffect();
}

// 添加章节悬停效果
function addChapterHoverEffect() {
  document.querySelectorAll('.chapter-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'var(--primary-light)';
      this.querySelector('.chapter-title').style.color = 'var(--primary-dark)';
    });

    link.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.querySelector('.chapter-title').style.color = '';
    });
  });
}