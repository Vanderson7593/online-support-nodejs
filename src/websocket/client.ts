import { io } from "../http";
import { ConnectionService } from "../services/connection-service";
import { UserService } from "../services/user-service";
import { MessageService } from "../services/message-service";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const { id: socket_id } = socket;
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on("client_first_access", async (params) => {
    const { text, email } = params as IParams;
    let user_id = null;

    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create(email);
      user_id = user.id;

      await connectionService.create({
        socket_id,
        user_id: user.id,
      });
    } else {
      const connection = await connectionService.findByUserId(userExists.id);
      user_id = userExists.id;

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: user_id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionService.create(connection);
      }
    }

    await messageService.create({
      text,
      user_id,
    });
  });
});
