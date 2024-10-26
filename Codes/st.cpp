#include <iostream>
#include <cmath>

using namespace std;

const int N = 1e5 + 10;
long mp_max[N][30];

int query(int l, int r) {
    int k = log2(r - l + 1);
    return max(mp_max[l][k], mp_max[r - (1 << k) + 1][k]);
}

int main() {
    //freopen("109.in", "r", stdin);
    int n, m;
    cin >> n >> m;

    // 1 基索引输入
    for (int i = 1; i <= n; i++) {
        int a;
        cin >> a;
        mp_max[i][0] = a; // 直接使用 1 基索引
    }

    int k = log2(n);

    // 构建 Sparse Table
    for (int i = 1; i <= k; i++) {
        for (int j = 1; j + (1 << i) - 1 <= n; j++) { // 确保不越界
            mp_max[j][i] = max(mp_max[j][i - 1], mp_max[j + (1 << (i - 1))][i - 1]);
        }
    }

    // 处理查询
    for (int i = 1; i <= m; i++) {
        int l, r;
        cin >> l >> r;
        cout << query(l, r) << endl; // 直接使用 1 基索引
    }

    return 0;
}
