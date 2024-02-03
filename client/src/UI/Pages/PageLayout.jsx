import React from 'react';
import { Layout, Menu } from 'antd';
import {
  SendOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const { Header, Content, Footer, Sider } = Layout;

/**
 * Общий макет страницы, включающий боковую панель навигации и контент.
 * @component
 * @param {Object} props - Пропсы компонента.
 * @param {JSX.Element} props.children - Дочерние элементы, которые будут отображены в основной части страницы.
 * @returns {JSX.Element} - Элемент компонента.
 */



const PageLayout = ({ children }) => {


  const {t} = useTranslation();

  const items = [
    { key: '1', icon: <SendOutlined />, label: t("menu.Tasks"), to: '/' },
    { key: '2', icon: <VideoCameraOutlined />, label: t("menu.Projects"), to: '/projects' },
    { key: '3', icon: <AreaChartOutlined />, label: t("menu.Stats"), to: '/stats' },
    { key: '4', icon: <SettingOutlined />, label: t("menu.Settings"), to: '/settings' },
    // Add more items as needed
  ];

  return (
    <Layout style={{ height:"100%", minHeight: '100vh' }}>
      {/* Боковая панель навигации */}
      <Sider
        style={{
          borderRadius: '0 0 20px 0'
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        {/* Меню навигации */}
        <Menu theme="dark" mode="inline" >
          {/* Элементы меню */}
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      {/* Основной контент страницы */}
      <Layout>
        {/* Верхняя часть макета */}
        <Header
          style={{
            padding: 0,
            background: 'linear-gradient(to right, #000000, #333333)',
            borderRadius: '0 0 40px 0'
          }}
        />
        {/* Основной контент страницы */}
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          {children}
        </Content>
        {/* Нижняя часть макета (по желанию) */}
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
