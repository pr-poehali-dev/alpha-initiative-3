import json
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    """Отправляет уведомление админу в Telegram о новой подписке"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        author_name = body.get('authorName', 'Unknown')
        tier_name = body.get('tierName', 'Unknown')
        tier_price = body.get('tierPrice', '0')
        currency = body.get('currency', '$')
        payment_method = body.get('paymentMethod', 'unknown')
        user_nickname = body.get('userNickname', 'Anonymous')
        
        bot_token = '8192256627:AAFzd6w-2JdG0IgSs9DDPxXWTl0D96YNlGw'
        chat_id = '7801332758'
        
        message = (
            f"🎉 New Subscription!\n\n"
            f"👤 User: {user_nickname}\n"
            f"✨ Author: {author_name}\n"
            f"💎 Tier: {tier_name}\n"
            f"💰 Price: {currency}{tier_price}/mo\n"
            f"💳 Payment: {payment_method.upper()}"
        )
        
        telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
        data = json.dumps({
            'chat_id': chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }).encode('utf-8')
        
        req = urllib.request.Request(
            telegram_url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            response.read()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
