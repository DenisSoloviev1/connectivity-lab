import { appRouting } from "@/app/config";
import { Link } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";

const Main = () => {
  const connectionTypes = [
    {
      title: "REST API",
      description: "Тестирование HTTP запросов и RESTful эндпоинтов. Отправка GET, POST, PUT, DELETE запросов и анализ ответов.",
      href: appRouting.rest.path,
      color: "primary" as const,
      icon: "🔗"
    },
    {
      title: "WebSocket",
      description: "Двустороннее соединение в реальном времени. Тестирование живых подключений, отправка и получение сообщений.",
      href: appRouting.socket.path,
      color: "secondary" as const,
      icon: "⚡"
    },
    {
      title: "Server-Sent Events",
      description: "Односторонняя потоковая передача данных от сервера к клиенту. Идеально для уведомлений и live-данных.",
      href: appRouting.sse.path,
      color: "success" as const,
      icon: "📡"
    },
    {
      title: "WebRTC",
      description: "Пиринговые соединения для аудио, видео и данных. Прямое общение между клиентами без сервера.",
      href: appRouting.webRTC.path,
      color: "warning" as const,
      icon: "🎥"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок и описание */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Тестовая среда подключений
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Комплексная платформа для тестирования и демонстрации различных типов клиентских подключений. 
            Идеальный инструмент для разработчиков, позволяющий быстро проверять работу REST API, WebSocket, 
            Server-Sent Events и WebRTC соединений в реальном времени.
          </p>
        </div>

        {/* Карточки подключений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {connectionTypes.map((connection) => (
            <Card 
              key={connection.title}
              className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              <CardBody className="flex flex-col p-6">
                <div className="text-3xl mb-4">{connection.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {connection.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 grow text-sm leading-relaxed">
                  {connection.description}
                </p>
                <Link
                  href={connection.href}
                  color={connection.color}
                  className="mt-4 font-semibold text-gray-800 dark:text-white"
                  showAnchorIcon
                >
                  Перейти к тестированию
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Возможности платформы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Быстрое тестирование</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Мгновенное переключение между типами подключений без перезагрузки страниц
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-3">🔧</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Реальное время</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Мониторинг соединений в реальном времени с подробной статистикой
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Детальная аналитика</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Визуализация данных подключений
              </p>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center mt-12 pb-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Тестовая среда для разработчиков • Поддерживает современные веб-технологии
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;